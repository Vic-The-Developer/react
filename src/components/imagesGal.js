import './comp.css'

export function ImagesGallery({images}){
    return(
        <div className="row pics">
            {
                images.map((url)=>{
                    return (
                        <div className="col-sm-1">
                            <div className="card">
                                <img src={url} alt="pics"/>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}