import HeaderGeneric from "@/components/pages/form/headerGeneric"

type Props = {
    children: React.ReactNode
}

export default function FormLayout({children}:Props) {
    return (
        <section>
            <HeaderGeneric/>
            {children}
        </section>
    )
}