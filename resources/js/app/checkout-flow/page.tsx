import Header from '@/components/common/Header';
import CheckoutFlowInteractive from './components/CheckoutFlowInteractive';

export const metadata = {
    title: 'Checkout - UpWearLane',
    description:
        'Complete your purchase with secure payment options including credit cards, cryptocurrency, Google Pay, and Apple Pay. Fast worldwide shipping to Nigeria, USA, UK, and Canada.',
};

export default function CheckoutFlowPage() {
    return (
        <>
            <Header />
            <CheckoutFlowInteractive />
        </>
    );
}
 