

const Card = ({message, likesCount, }) => {
    return <>
    <div>
        <h2>
        {message}
        {likesCount} ❤️
        </h2></div></>
};

export default Card;