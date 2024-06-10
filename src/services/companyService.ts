export async function getCompanyInfo() {
    const res = await fetch('http://localhost:3000/company-information',{
        method: 'GET',
        cache: 'no-store',
        next: {
            revalidate: 10
        }
    })
}