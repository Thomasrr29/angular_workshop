import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema()
export class Admin {

    @Prop({required: true})
    username: string

    @Prop({required: true})
    email: string

    @Prop({required: true})
    password: string

}


export const adminSchema = SchemaFactory.createForClass(Admin)
