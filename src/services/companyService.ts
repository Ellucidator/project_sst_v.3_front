import { helpers } from "@/helpers/helpers";
import { CompanyInformation } from "@/types/companyTypes";

async function getCompanyInfo() {

    const companyInfo: CompanyInformation = await helpers.getSimpleRequestAndHandleError({
        url:process.env.API_HOST + '/company-information',
        cache:'default',
        revalidate:60*60*24
    })

    return companyInfo
}

export const companyService = {
    getCompanyInfo
}