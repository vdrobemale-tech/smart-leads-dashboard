import mongoose, { Document, Schema } from 'mongoose';

// 🔴 UPDATED Interface - Naye Fields Add Kiye
export interface ILead extends Document {
  name: string;
  email: string;
  phone?: string;         // ✅ Add kiya
  company?: string;       // ✅ Add kiya
  status: 'New' | 'Contacted' | 'Qualified' | 'Lost';
  source: 'Website' | 'Instagram' | 'Referral';
  notes?: string;         // ✅ Add kiya
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    // ✅ Name Field
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    
    // ✅ Email Field
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
    },
    
    // ✅ PHONE FIELD - NAYA ADD KIYA
    phone: {
      type: String,
      trim: true,
      default: null,
      // required: false, // Optional rakha hai agar zaruri ho toh true karo
    },
    
    // ✅ COMPANY FIELD - NAYA ADD KIYA
    company: {
      type: String,
      trim: true,
      default: null,
      maxlength: [100, 'Company name too long'],
    },

    // ✅ STATUS FIELD - FIXED ENUMS
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Qualified', 'Lost'], // ✅ Capital letters exactly
      default: 'New',
      required: [true, 'Status is required'],
    },

    // ✅ SOURCE FIELD - FIXED ENUMS  
    source: {
      type: String,
      enum: ['Website', 'Instagram', 'Referral'], // ✅ Exact match with frontend
      required: [true, 'Source is required'],
    },

    // ✅ NOTES FIELD - NAYA ADD KIYA
    notes: {
      type: String,
      trim: true,
      default: '',
      maxlength: [2000, 'Notes cannot exceed 2000 characters'],
    },

    // ✅ Created By (User Reference)
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
  },
  { 
    timestamps: true // ✅ Auto createdAt & updatedAt
  }
);

// Indexes for faster queries
LeadSchema.index({ createdAt: -1 });
LeadSchema.index({ email: 1 });
LeadSchema.index({ status: 1 });

export default mongoose.model<ILead>('Lead', LeadSchema);