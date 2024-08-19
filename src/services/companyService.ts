import { CompanyInformation } from "@/types/companyTypes";

async function getCompanyInfo() {
    try {
        const res = await fetch(process.env.API_HOST + '/company-information',{
            method: 'GET',
            cache: 'default',
            next: {
                revalidate: 10
            }
        })
    
        const data: CompanyInformation = await res.json();
        return data
    } catch (error) {
        return false
    }
}

export const companyService = {
    getCompanyInfo
}