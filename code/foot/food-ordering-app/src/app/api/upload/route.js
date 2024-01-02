/*async function handleFileChange(ev) {

    ev.preventDefault()

    const files = ev.target.files
    
    if(files?.length > 0) {

        const data = new FormData

        data.set("file", files[0])
        
        await fetch("/api/upload", {
        
            method: "POST",

            body: data,

        })
    
    }

}

export async function POST(req){

    const data = await req.formData()

    if(data.get("file")) {
        
        // upload


    
    }

    return Response.json(true)

}*/