import mongoose from "mongoose";

const { Schema } = mongoose;

const DataUserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    lokasigunung: {
      type: String,
      required: true,
    },
    tanggalNaik: {
      type: Date,
      required: true,
    },
    tanggalTurun: {
      type: Date,
      required: true,
    },
    kertas: {
      type: Number,
      required: true,
    },
    plastik: {
      type: Number,
      required: true,
    },
    kaleng: {
      type: Number,
      required: true,
    },
    buktiSampah: {
      type: String,
    },
    buktiRegistrasi: {
      type: String,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "approved", "rejected"],
    },
    totalPoin: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.models.DataUser ||
  mongoose.model("DataUser", DataUserSchema);
