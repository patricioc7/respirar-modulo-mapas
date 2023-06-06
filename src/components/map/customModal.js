import "./modal.css"

export const CustomModal = ({children, isOpen, closeModal}) => {
    const handleModalContainerClick = e => e.stopPropagation()
    return (
        <article className={`historicModal ${isOpen && "is-open"}`}>
            <div className="historicModal-container" onClick={handleModalContainerClick}>
            <div className="historicModal-header">
            <button className="historicModal-close" onClick={closeModal}>X</button>
            </div>
            {children}
            </div>
        </article>
    );
};