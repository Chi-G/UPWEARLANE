<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #D4AF37 0%, #C5A028 100%);
            color: #ffffff;
            padding: 30px;
            text-align: center;
        }
        .header img {
            max-width: 200px;
            height: auto;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
        }
        .content {
            padding: 30px;
        }
        .greeting {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 20px;
            color: #1a1a1a;
        }
        .order-info {
            background-color: #f9f9f9;
            border-left: 4px solid #D4AF37;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }
        .order-info p {
            margin: 8px 0;
            font-size: 14px;
        }
        .order-info strong {
            color: #1a1a1a;
            font-weight: 600;
        }
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        .items-table th {
            background-color: #f0f0f0;
            padding: 12px;
            text-align: left;
            font-weight: 600;
            font-size: 14px;
            color: #1a1a1a;
            border-bottom: 2px solid #D4AF37;
        }
        .items-table td {
            padding: 12px;
            border-bottom: 1px solid #e0e0e0;
            font-size: 14px;
        }
        .items-table tr:last-child td {
            border-bottom: none;
        }
        .total-section {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 2px solid #e0e0e0;
        }
        .total-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            font-size: 14px;
        }
        .total-row.grand-total {
            font-size: 18px;
            font-weight: 700;
            color: #D4AF37;
            padding-top: 12px;
            border-top: 2px solid #D4AF37;
            margin-top: 8px;
        }
        .shipping-address {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 4px;
            margin: 20px 0;
        }
        .shipping-address h3 {
            margin: 0 0 10px 0;
            font-size: 16px;
            color: #1a1a1a;
        }
        .shipping-address p {
            margin: 4px 0;
            font-size: 14px;
            color: #555;
        }
        .footer {
            background-color: #f0f0f0;
            padding: 20px 30px;
            text-align: center;
            font-size: 13px;
            color: #666;
        }
        .footer a {
            color: #D4AF37;
            text-decoration: none;
        }
        .button {
            display: inline-block;
            padding: 12px 30px;
            background-color: #D4AF37;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-weight: 600;
            margin: 20px 0;
            transition: background-color 0.3s;
        }
        .button:hover {
            background-color: #C5A028;
        }
        .success-icon {
            font-size: 48px;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <img src="{{ config('app.url') }}/images/logo.png" alt="UpWearLane" />
            <h1 style="margin-top: 15px;">Order Confirmed!</h1>
        </div>

        <!-- Content -->
        <div class="content">
            <p class="greeting">Hello {{ $customerName }},</p>

            <p>Thank you for your order! We're pleased to confirm that your payment has been received and your order is now being processed.</p>

            <!-- Order Information -->
            <div class="order-info">
                <p><strong>Order Number:</strong> {{ $orderNumber }}</p>
                <p><strong>Order Date:</strong> {{ $order->created_at->format('F j, Y g:i A') }}</p>
                <p><strong>Payment Method:</strong> {{ $paymentMethod }}</p>
                <p><strong>Payment Status:</strong> <span style="color: #28a745; font-weight: 600;">Paid</span></p>
            </div>

            <!-- Order Items -->
            <h3 style="margin-top: 30px; margin-bottom: 15px; color: #1a1a1a;">Order Items</h3>
            <table class="items-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th style="text-align: center;">Qty</th>
                        <th style="text-align: right;">Price</th>
                        <th style="text-align: right;">Total</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($items as $item)
                    <tr>
                        <td>
                            <strong>{{ $item->product_name }}</strong>
                            @if($item->attributes)
                                @php
                                    $attrs = json_decode($item->attributes, true);
                                    $variations = $attrs['variations'] ?? null;
                                @endphp
                                @if($variations)
                                    <br>
                                    <small style="color: #666;">
                                        @if(isset($variations['color']))
                                            Color: {{ $variations['color'] }}
                                        @endif
                                        @if(isset($variations['size']))
                                            {{ isset($variations['color']) ? ' | ' : '' }}Size: {{ $variations['size'] }}
                                        @endif
                                    </small>
                                @endif
                            @endif
                        </td>
                        <td style="text-align: center;">{{ $item->quantity }}</td>
                        <td style="text-align: right;">{{ $currency }} {{ number_format($item->unit_price, 2) }}</td>
                        <td style="text-align: right;">{{ $currency }} {{ number_format($item->total_price, 2) }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>

            <!-- Order Total -->
            <div class="total-section">
                <div class="total-row">
                    <span>Subtotal:</span>
                    <span>{{ $currency }} {{ number_format($order->subtotal, 2) }}</span>
                </div>
                <div class="total-row">
                    <span>Shipping ({{ $order->shipping_method }}):</span>
                    <span>{{ $currency }} {{ number_format($order->shipping_cost, 2) }}</span>
                </div>
                <div class="total-row">
                    <span>Tax:</span>
                    <span>{{ $currency }} {{ number_format($order->tax, 2) }}</span>
                </div>
                @if($order->discount > 0)
                <div class="total-row" style="color: #28a745;">
                    <span>Discount:</span>
                    <span>-{{ $currency }} {{ number_format($order->discount, 2) }}</span>
                </div>
                @endif
                <div class="total-row grand-total">
                    <span>Total:</span>
                    <span>{{ $currency }} {{ number_format($total, 2) }}</span>
                </div>
            </div>

            <!-- Shipping Address -->
            <div class="shipping-address">
                <h3>Shipping Address</h3>
                <p><strong>{{ $shippingAddress->full_name }}</strong></p>
                <p>{{ $shippingAddress->address_line_1 }}</p>
                @if($shippingAddress->address_line_2)
                <p>{{ $shippingAddress->address_line_2 }}</p>
                @endif
                <p>{{ $shippingAddress->city }}, {{ $shippingAddress->state }} {{ $shippingAddress->postal_code }}</p>
                <p>{{ $shippingAddress->country }}</p>
                <p>Phone: {{ $shippingAddress->phone }}</p>
                <p>Email: {{ $shippingAddress->email }}</p>
            </div>

            <!-- Call to Action -->
            <div style="text-align: center; margin-top: 30px;">
                <a href="{{ url('/orders/' . $order->id) }}" class="button">View Order Details</a>
            </div>

            <p style="margin-top: 30px; font-size: 14px; color: #666;">
                Your order will be shipped soon. You'll receive another email with tracking information once your order ships.
            </p>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>Thank you for shopping with <strong>UPWEARLANE</strong></p>
            <p>
                Questions? Contact us at <a href="mailto:support@upwearlane.com">support@upwearlane.com</a>
            </p>
            <p style="margin-top: 15px; font-size: 12px; color: #999;">
                This is an automated email. Please do not reply directly to this message.
            </p>
        </div>
    </div>
</body>
</html>
