import type { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <img
            src="/kamalan_logo_green.png"
            alt="Kamalan Dashboard Logo"
            className='h-32 w-32 object-contain'
        />
    );
}
