fetchImageData = async function(numberOfCases) {
    let hosturl = 'https://api.gdc.cancer.gov/files'
    let body = ({
        'fields': "data_format,id",
        'from': 0,
        'size': numberOfCases
    })
    let betterFetch = async function(url,body) {
        let fetchData = { 
            method: 'POST', 
            body: JSON.stringify(body),
            headers:{'Content-Type':'application/json'}
        }
        let tmpData=(await fetch(url, fetchData)).json()
        return(tmpData)
      };
    let temp = (await betterFetch(hosturl,body))
    let tissueID = temp.data.hits.filter(function(d) {return d.data_format == "SVS"})
    let sampleData = []
    for(var i = 0; i < tissueID.length; i++) {
        sampleData.push('https://api.gdc.cancer.gov/tile/' + tissueID[i].id + '?level=10&x=0&y=0')
    }
    return (sampleData)
};