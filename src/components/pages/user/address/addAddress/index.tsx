import ButtonReturn from '@/components/common/btnReturn'
import styles from './styles.module.scss'
import { userService } from '@/services/userService'
import { UserAddress } from '@/types/userTypes'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import Title from '@/components/common/tiltle'
import Button from '@/components/common/button'
import Input from '@/components/common/Input-label-components/input&Label'

type Props = {
    addressId: string
}

const AddressUpdate = async ({ addressId }: Props) => {
    let addressValue: UserAddress = {
        id: 0,
        receiver_name: '',
        zip_code: 0,
        state: '',
        city: '',
        neighborhood: '',
        street: '',
        house_number: '',
        complement: '',
        phone_number: '',
        reference_point: '',
        active: false
    }

    if (addressId !=='0') {
        addressValue = await userService.getUserAddessById(addressId).then(res => res!)
    }
    

    const handlerSubmit = async (form: FormData) => {
        'use server'
        const newAddress ={
            id: parseInt(addressId),
            receiver_name: form.get('receiver_name')?.toString()!,
            zip_code: parseInt(form.get('zip_code')?.toString()!),
            state: form.get('state')?.toString()!,
            city: form.get('city')?.toString()!,
            neighborhood: form.get('neighborhood')?.toString()!,
            street: form.get('street')?.toString()!,
            house_number: form.get('house_number')?.toString()!,
            complement: form.get('complement')?.toString(),
            phone_number: form.get('phone_number')?.toString()!,
            reference_point: form.get('reference_point')?.toString(),
            active: false
        }

        if(newAddress.receiver_name==addressValue.receiver_name &&
            newAddress.zip_code==addressValue.zip_code &&
            newAddress.state==addressValue.state &&
            newAddress.city==addressValue.city &&
            newAddress.neighborhood==addressValue.neighborhood &&
            newAddress.street==addressValue.street &&
            newAddress.house_number==addressValue.house_number &&
            newAddress.complement==addressValue.complement &&
            newAddress.phone_number==addressValue.phone_number &&
            newAddress.reference_point==addressValue.reference_point
            ){
                redirect('/user/address')
            }

        await userService.createAddress(newAddress)
        revalidateTag('adresses-user')
        redirect('/user/address')
    }

    return (
        <>  
            <ButtonReturn />
            <Title fontSize="25px" model='model5' titleText="Novo endereço" />
            
            <form action={handlerSubmit} className={styles.formAddress}>
                
                <div className={styles.divInput}>
                    <Input divWidth='55%' inputOptions={{type:'text',placeholder:'Nome',name:'receiver_name',required:true,defaultValue:addressValue.receiver_name}}/>

                    <Input inputOptions={{type:'number',placeholder:'Telefone',name:'phone_number',required:true,defaultValue:parseInt(addressValue.phone_number)}}/>
                </div>
                <div className={styles.divInput} >
                    <Input divWidth='35%' inputOptions={{type:'number',placeholder:'CEP',name:'zip_code',required:true,defaultValue:addressValue.zip_code?addressValue.zip_code:''}}/>

                    <Input divWidth='10%' inputOptions={{type:'text',placeholder:'Estado',name:'state',required:true,defaultValue:addressValue.state}}/>

                    <Input inputOptions={{type:'text',placeholder:'Cidade',name:'city',required:true,defaultValue:addressValue.city}}/>
                </div>
                <div className={styles.divInput}>
                    <Input inputOptions={{type:'text',placeholder:'Rua',name:'street',required:true,defaultValue:addressValue.street}}/>

                    <Input divWidth='12%' inputOptions={{type:'text',placeholder:'Número',name:'house_number',required:true,defaultValue:addressValue.house_number}}/>

                    <Input divWidth='30%' inputOptions={{type:'text',placeholder:'Bairro',name:'neighborhood',required:true,defaultValue:addressValue.neighborhood}}/>
                </div>
                <div className={styles.divInput}>
                    <Input divWidth='25%' inputOptions={{type:'text',placeholder:'Complemento',name:'complement',required:false,defaultValue:addressValue.complement}}/>

                    <Input inputOptions={{type:'text',placeholder:'Ponto de referência',name:'reference_point',required:false,defaultValue:addressValue.reference_point}}/>
                </div>

                <Button btnModel='model2' btnName='SALVAR' btnAction='submit' btnWidth='100%'/>
            </form>
        </>
    )
}


export default AddressUpdate