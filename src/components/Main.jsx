export default function Main(props) {
    const { data } = props

    return (
        <div className="imgContainer">
            {/* <img src="/Spiral Galaxy NGC 6744.jpg" alt="Spiral Galaxy" className="bgImg"/> */}
            <img src={data.hdurl} alt={data.title || 'bg-img'} className="bgImg"/>
        </div>
    )
}
    
