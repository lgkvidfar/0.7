import { IBasicUser } from '@interfaces';
import { model, Schema } from 'mongoose';

export const schema = new Schema<IBasicUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },

        username: { type: String, required: true },
        password: { type: String, required: false },

        tokenVersion: { type: Number, required: true },

        cart: { type: Object, required: false },

        id: { type: String, required: true },
        sellerID: { type: String, required: false },
        adminID: { type: String, required: false },
        gitHubId: { type: String, required: false },
        gitHubLogin: { type: String, required: false },

        alive: { type: Boolean, required: true },
    },
    {
        timestamps: true,
    }
);

export default model<IBasicUser>('User', schema);
