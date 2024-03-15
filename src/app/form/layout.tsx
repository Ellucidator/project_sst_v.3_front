
type Props = {
    children: React.ReactNode
}

export default function FormLayout({children}:Props) {
    return (
        <section>
            {children}
        </section>
    )
}