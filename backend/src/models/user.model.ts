import { HydratedDocument, Model, Schema, model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string
}

export interface IUserMethods {
    comparePassword(password: string): Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "customer","manager"],
        default: "customer"
    }
});

userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password: string) {
    return bcrypt.compare(password, this.password);
};

export const User = model<IUser, UserModel>("User", userSchema);

export type UserDocument = HydratedDocument<IUser, IUserMethods>;


//old type declaration
// import { Schema, model } from "mongoose";

// import bcrypt from "bcrypt";

// const userSchema = new Schema(
//     {
//         firstName: {
//             type: String,
//             required: true,
//             trim: true,
//         },

//         lastName: {
//             type: String,
//             required: true,
//             trim: true,
//         },

//         email: {
//             type: String,
//             required: true,
//             unique: true,
//             lowercase: true,
//             trim: true,
//         },

//         password: {
//             type: String,
//             required: true,
//             minlength: 6,
//         },
//     },
//     {
//         timestamps: true,
//     }
// );
 
// userSchema.pre("save", async function () {
//     if (!this.isModified("password")) {
//         return;
//     }

//     this.password = await bcrypt.hash(this.password, 10);
// });

// userSchema.methods.comparePassword = async function (
//     password: string
// ) {
//     return bcrypt.compare(password, this.password);
// };

// export const User = model("User", userSchema);
