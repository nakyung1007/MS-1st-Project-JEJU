/* eslint-disable react/prop-types */

const Input = ({type, name, text, value, onChange}) => {
    return (
        <input
            name={name}
            type={type}
            placeholder={text}
            className={
                `${type === 'number' ? 'no-arrows ' : ''}` +
                "absolute flex left-1/2 transform -translate-x-1/2 justify-center bg-white text-black border-4 border-jeju-green rounded-full text-center w-6/12 outline-none " +
                "2xl:bottom-2/12 2xl:space-x-40 2xl:py-8 2xl:text-3xl " +
                "xl:bottom-2/12 xl:space-x-36 xl:py-5 xl:text-3xl " +
                "lg:bottom-2/12 lg:space-x-32 lg:py-4 lg:text-2xl " +
                "md:bottom-2/12 md:space-x-28 md:py-3 md:text-xl " +
                "sm:bottom-2/12 sm:space-x-24 sm:py-2 sm:text-lg " +
                "bottom-3/12 space-x-8 py-0.5 text-sm"
            }
            value={value}
            onChange={e => onChange(e)}
        />
    );
};

export default Input;