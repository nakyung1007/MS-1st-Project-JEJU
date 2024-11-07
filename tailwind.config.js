// noinspection SpellCheckingInspection

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'jeju-green': '#7ed957',
                'jeju-orange': '#feac36',
                'jeju-gray': '#adb5bd',
            },
            fontSize: {
                'xxs': '0.563rem',
                '10xl': '10rem',
                '11xl': '12rem',
                '12xl': '14rem',
                '13xl': '16rem',
                '14xl': '18rem',
            },
            animation: {
                twinkle: 'twinkle 2s infinite ease-in-out',
                'text-focus-in': 'text-focus-in 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
                'roll-in-left': 'roll-in-left 0.6s ease-out both',
                'focus-in-expand-fwd': 'focus-in-expand-fwd 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
                'slide-top': 'slide-top 2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both infinite',
            },
            keyframes: {
                twinkle: {
                    '0%, 100%': {
                        opacity: '0',
                        transform: 'scale(1)'
                    },
                    '50%': {
                        opacity: '1',
                        transform: 'scale(1.5)'
                    },
                },
                'text-focus-in': {
                    '0%': {
                        '-webkit-filter': 'blur(12px)',
                        filter: 'blur(12px)',
                        opacity: '0'
                    },
                    '100%': {
                        '-webkit-filter': 'blur(0px)',
                        filter: 'blur(0px)',
                        opacity: '1'
                    },
                },
                'roll-in-left': {
                    '0%': {
                        '-webkit-transform': 'translateX(-800px) rotate(-540deg)',
                        transform: 'translateX(-800px) rotate(-540deg)',
                        opacity: '0'
                    },
                    '100%': {
                        '-webkit-transform': 'translateX(0) rotate(0deg)',
                        transform: 'translateX(0) rotate(0deg)',
                        opacity: '1'
                    },
                },
                'focus-in-expand-fwd': {
                    '0%': {
                        '-webkit-transform': 'translateZ(-800px)',
                        '-webkit-filter': 'blur(12px)',
                        transform: 'translateZ(-800px)',
                        filter: 'blur(12px)',
                        letterSpacing: '-0.5em',
                        opacity: '0'
                    },
                    '100%': {
                        '-webkit-transform': 'translateZ(0)',
                        '-webkit-filter': 'blur(0)',
                        transform: 'translateZ(0)',
                        filter: 'blur(0)',
                        opacity: '1'
                    }
                },
                'slide-top': {
                    '0%': {
                        transform: 'translateY(100px)',
                        opacity: '0'
                    },
                    '100%': {
                        transform: 'translateY(0)',
                        opacity: '1'
                    }
                },
            },
            animationDelay: {
                '0': '0ms',
                '500': '500ms',
                '1000': '1000ms',
            },
            inset: {
                '0/12': '0%',
                '1/12': '8.333%',
                '2/12': '16.666%',
                '3/12': '25%',
                '4/12': '33.333%',
                '5/12': '41.666%',
                '6/12': '50%',
                '7/12': '58.333%',
                '8/12': '66.666%',
                '9/12': '75%',
                '10/12': '83.333%',
                '11/12': '91.666%',
                '12/12': '100%',
            }
        },
    },
    plugins: [
        function ({addUtilities, theme, e}) {
            const delays = theme('animationDelay');
            const utilities = Object.keys(delays).map(key => ({
                [`.${e(`delay-${key}`)}`]: {
                    animationDelay: delays[key],
                },
            }));
            addUtilities(utilities);
        }
    ],
};