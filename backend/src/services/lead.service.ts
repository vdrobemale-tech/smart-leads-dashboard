import Lead, { ILead } from '../models/Lead.model';
import { ApiError } from '../utils/ApiError';
import {
  CreateLeadInput,
  UpdateLeadInput,
  LeadQuery,
  PaginationMeta,
} from '../types/lead.types';

export const createLead = async (
  input: CreateLeadInput,
  userId: string
): Promise<ILead> => {
  const lead = await Lead.create({
    ...input,
    createdBy: userId,
  });
  return lead;
};

export const getAllLeads = async (
  query: LeadQuery,
  userId: string,
  userRole: string
): Promise<{ leads: ILead[]; meta: PaginationMeta }> => {
  const {
    status,
    source,
    search,
    sort = 'latest',
    page = 1,
    limit = 10,
  } = query;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filter: any = {};

  if (userRole === 'sales') {
    filter.createdBy = userId;
  }

  if (status) filter.status = status;
  if (source) filter.source = source;

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }

  const sortOrder = sort === 'latest' ? -1 : 1;
  const skip = (Number(page) - 1) * Number(limit);

  const [leads, total] = await Promise.all([
    Lead.find(filter)
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(Number(limit))
      .populate('createdBy', 'name email'),
    Lead.countDocuments(filter),
  ]);

  return {
    leads,
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    },
  };
};

export const getLeadById = async (
  leadId: string,
  userId: string,
  userRole: string
): Promise<ILead> => {
  const lead = await Lead.findById(leadId).populate('createdBy', 'name email');

  if (!lead) {
    throw new ApiError(404, 'Lead not found');
  }

  if (userRole === 'sales' && lead.createdBy.toString() !== userId) {
    throw new ApiError(403, 'Not authorized to view this lead');
  }

  return lead;
};

export const updateLead = async (
  leadId: string,
  input: UpdateLeadInput,
  userId: string,
  userRole: string
): Promise<ILead> => {
  const lead = await Lead.findById(leadId);

  if (!lead) {
    throw new ApiError(404, 'Lead not found');
  }

  if (userRole === 'sales' && lead.createdBy.toString() !== userId) {
    throw new ApiError(403, 'Not authorized to update this lead');
  }

  const updatedLead = await Lead.findByIdAndUpdate(leadId, input, {
    new: true,
    runValidators: true,
  });

  return updatedLead as ILead;
};

export const deleteLead = async (
  leadId: string,
  userId: string,
  userRole: string
): Promise<void> => {
  const lead = await Lead.findById(leadId);

  if (!lead) {
    throw new ApiError(404, 'Lead not found');
  }

  if (userRole === 'sales' && lead.createdBy.toString() !== userId) {
    throw new ApiError(403, 'Not authorized to delete this lead');
  }

  await Lead.findByIdAndDelete(leadId);
};

export const exportLeadsCSV = async (
  userId: string,
  userRole: string
): Promise<ILead[]> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filter: any = {};

  if (userRole === 'sales') {
    filter.createdBy = userId;
  }

  const leads = await Lead.find(filter)
    .populate('createdBy', 'name email')
    .sort({ createdAt: -1 });

  return leads;
};