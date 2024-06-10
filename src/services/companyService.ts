import { CompanyInformation } from "@/types/companyTypes";

async function getCompanyInfo() {
    const res = await fetch('http://localhost:3000/company-information',{
        method: 'GET',
        cache: 'default',
        next: {
            revalidate: 10
        }
    })

    const data: CompanyInformation = await res.json();
    return data
}

export const companyService = {
    getCompanyInfo
}