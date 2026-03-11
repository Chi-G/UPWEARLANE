<?php

namespace App\Console\Commands;

use App\Models\Order;
use App\Models\Payment;
use App\Models\Transaction;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class ReconcilePayments extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:reconcile-payments';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Reconcile payments with ledger transactions';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting reconciliation...');

        // Find payments that don't have a transaction record
        $payments = Payment::where('status', 'completed')
            ->whereNotExists(function ($query) {
                $query->select(DB::raw(1))
                    ->from('transactions')
                    ->whereRaw('transactions.reference = payments.transaction_id');
            })->get();

        if ($payments->isEmpty()) {
            $this->info('No discrepancy found.');
            return 0;
        }

        foreach ($payments as $payment) {
            $order = $payment->order;
            if (!$order) continue;

            $this->info("Creating missing transaction for Payment ID: {$payment->id}");

            Transaction::create([
                'user_id' => $order->user_id,
                'order_id' => $order->id,
                'amount' => $payment->amount,
                'currency' => $payment->currency,
                'type' => 'credit',
                'status' => 'completed',
                'reference' => $payment->transaction_id,
                'description' => 'Payment for order ' . $order->order_number . ' (Reconciled)',
                'metadata' => [
                    'reconciled_at' => now(),
                    'provider' => $payment->payment_provider,
                ],
            ]);
        }

        $this->info('Reconciliation complete.');
        return 0;
    }
}
