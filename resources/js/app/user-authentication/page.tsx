import Header from '@/components/common/Header';
import UserAuthenticationInteractive from './components/UserAuthenticationInteractive';

export const metadata = {
    title: 'User Authentication - UpWearLane',
    description:
        'Sign in or create an account to access exclusive tech fashion deals, track orders, and enjoy faster checkout at UpWearLane.',
};

export default function UserAuthenticationPage({ mode = 'login' }: { mode?: 'login' | 'register' }) {
    const accountBenefits = [
        {
            id: 1,
            title: 'Order Tracking',
            description:
                'Track your orders in real-time from warehouse to doorstep with email and SMS updates',
        },
        {
            id: 2,
            title: 'Faster Checkout',
            description:
                'Save your shipping addresses and payment methods for lightning-fast purchases',
        },
        {
            id: 3,
            title: 'Exclusive Offers',
            description:
                'Get early access to new tech fashion releases and member-only discounts up to 30% off',
        },
        {
            id: 4,
            title: 'Wishlist & Favorites',
            description:
                'Save your favorite items and get notified when they go on sale or restock',
        },
        {
            id: 5,
            title: 'Order History',
            description:
                'Access your complete purchase history and easily reorder your favorite items',
        },
        {
            id: 6,
            title: 'Priority Support',
            description:
                'Get dedicated customer support via WhatsApp and AI chatbot assistance 24/7',
        },
    ];

    return (
        <>
            <Header />
            <UserAuthenticationInteractive benefits={accountBenefits} initialMode={mode} />
        </>
    );
}
