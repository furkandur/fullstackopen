const Finder = ({ handleFinderChange, finder }) => {
    return(
        <div>
            find countries: <input onChange={handleFinderChange} value={finder}/>
        </div>
    )
}

export default Finder