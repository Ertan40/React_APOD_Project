export default function SideBar(props) {
    const { handleToggleModal, data } = props

    return (
        <div className="sideBar">
            <div className="bgOverlay" onClick={handleToggleModal}></div>
            <div className="sideBarContents">
                <h2>{data?.title}</h2>
                <div className="descriptionCon">
                    <p>Description:</p>
                    <p>{data?.explanation}</p>
                </div>
                <button onClick={handleToggleModal}>
                    <i className="fa fa-arrow-right" aria-hidden="true"></i>
                </button>
            </div>
            
        </div>
    )
}