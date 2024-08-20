import { helpers } from "@/helpers/helpers";
import { CompanyInformation } from "@/types/companyTypes";

async function getCompanyInfo() {

    const companyInfo: CompanyInformation = await helpers.getSimpleRequestAndHandleError(process.env.API_HOST + '/company-information')

    return companyInfo
}

export const companyService = {
    getCompanyInfo
}