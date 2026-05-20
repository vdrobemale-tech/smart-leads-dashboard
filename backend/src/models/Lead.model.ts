import mongoose, {
  Document,
  Schema,
} from 'mongoose';

export interface ILead
  extends Document {
  name: string;
  email: string;
  phone?: string;
  company?: string;

  status:
    | 'New'
    | 'Contacted'
    | 'Qualified'
    | 'Lost';

  source:
    | 'Website'
    | 'Instagram'
    | 'Referral';

  notes?: string;

  createdBy: mongoose.Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema =
  new Schema<ILead>(
    {
      name: {
        type: String,
        required: [
          true,
          'Name is required',
        ],
        trim: true,
        maxlength: [
          100,
          'Name cannot exceed 100 characters',
        ],
      },

      email: {
        type: String,
        required: [
          true,
          'Email is required',
        ],
        lowercase: true,
        trim: true,
        match: [
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
          'Please enter a valid email',
        ],
      },

      phone: {
        type: String,
        trim: true,
        default: '',
      },

      company: {
        type: String,
        trim: true,
        default: '',
        maxlength: [
          100,
          'Company name too long',
        ],
      },

      status: {
        type: String,
        enum: [
          'New',
          'Contacted',
          'Qualified',
          'Lost',
        ],
        default: 'New',
        required: [
          true,
          'Status is required',
        ],
      },

      source: {
        type: String,
        enum: [
          'Website',
          'Instagram',
          'Referral',
        ],
        required: [
          true,
          'Source is required',
        ],
      },

      notes: {
        type: String,
        trim: true,
        default: '',
        maxlength: [
          2000,
          'Notes cannot exceed 2000 characters',
        ],
      },

      createdBy: {
        type:
          Schema.Types
            .ObjectId,
        ref: 'User',
        required: [
          true,
          'User ID is required',
        ],
      },
    },
    {
      timestamps: true,
    }
  );

LeadSchema.index({
  createdAt: -1,
});

LeadSchema.index({
  email: 1,
});

LeadSchema.index({
  status: 1,
});

export default mongoose.model<ILead>(
  'Lead',
  LeadSchema
);
