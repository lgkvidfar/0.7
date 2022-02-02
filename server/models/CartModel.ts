import { ICart } from '@interfaces';
import { model, Schema } from 'mongoose';

export const schema = new Schema<ICart>(
    {
        id: { type: String, required: true },
        alive: { type: Boolean, required: true },
        total: { type: Number, required: true },
        cart: { type: [], required: true },
    },
    {
        timestamps: true,
    }
);

export default model<ICart>('Cart', schema);
