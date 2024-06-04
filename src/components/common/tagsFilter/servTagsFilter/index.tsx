    const actionFilter=async(form:FormData)=>{
        'use server'

        const filter = form.getAll('filter')
        const catalogCookie = cookies().get(`catalog${subCategoryId}`)?.value

        if(catalogCookie){
            const catalogCookieOn: {itemsOrder?: string ,tags?: any[] } = JSON.parse(catalogCookie)
            catalogCookieOn.tags = filter
            cookies().set(`catalog${subCategoryId}`, JSON.stringify(catalogCookieOn),
            {
                maxAge: 60 * 60 * 24
            })
        }else{
            cookies().set(`catalog${subCategoryId}`, JSON.stringify({itemsOrder:'created_at-DESC',tags:filter}),
            {
                maxAge: 60 * 60 * 24
            })
        }
    }
