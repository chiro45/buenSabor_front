

import "./LayoutModal.css"
export const LayoutModal = ({ children }: any) => {
    return (
        <div className="containerLayoutModal">
            <div className="containerChildrensLayoutModal">
                {children}
            </div>
        </div>
    )
}
