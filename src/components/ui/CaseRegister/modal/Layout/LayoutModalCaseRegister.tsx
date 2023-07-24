
export const LayoutModalCaseRegister = ({ children, height, width }: any) => {
    return (
        <div className="containerLayoutModalCaseRegister">
            <div className='containerLayoutModal'>
                <div className="containerChildrensLayoutModaRegister" style={{ height, width }}>
                    {children}
                </div>
            </div>
        </div>
    )
}