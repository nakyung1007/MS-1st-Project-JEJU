/* eslint-disable react/prop-types */

const SubTitle = ({text, aniamtion, last}) => {
    return (
        <p
            className={
                `text-gray-500 ${aniamtion} ` +
                `${last === true ? '2xl:mb-32 xl:mb-28 lg:mb-24 md:mb-20 sm:mb-14 mb-8 ' : 'mb-2 '} ` +
                "2xl:text-4xl " +
                "xl:text-3xl " +
                "lg:text-2xl " +
                "md:text-xl " +
                "sm:text-lg " +
                "text-xs"
            }
        >
            {text}
        </p>
    );
};

export default SubTitle;