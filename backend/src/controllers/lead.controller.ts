import { Request, Response, NextFunction } from 'express';
import {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
  exportLeadsCSV,
} from '../services/lead.service';
import { sendResponse } from '../utils/ApiResponse';
import { LeadQuery } from '../types/lead.types';

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const lead = await createLead(req.body, req.user!.id);
    sendResponse(res, 201, 'Lead created successfully', lead);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const query = req.query as unknown as LeadQuery;
    const result = await getAllLeads(query, req.user!.id, req.user!.role);
    sendResponse(res, 200, 'Leads fetched successfully', result);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const lead = await getLeadById(
      req.params.id,
      req.user!.id,
      req.user!.role
    );
    sendResponse(res, 200, 'Lead fetched successfully', lead);
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const lead = await updateLead(
      req.params.id,
      req.body,
      req.user!.id,
      req.user!.role
    );
    sendResponse(res, 200, 'Lead updated successfully', lead);
  } catch (error) {
    next(error);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await deleteLead(req.params.id, req.user!.id, req.user!.role);
    sendResponse(res, 200, 'Lead deleted successfully');
  } catch (error) {
    next(error);
  }
};

export const exportCSV = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const leads = await exportLeadsCSV(req.user!.id, req.user!.role);

    const fields = ['name', 'email', 'status', 'source', 'createdAt'];
    const csvRows = [
      fields.join(','),
      ...leads.map((lead) =>
        [
          lead.name,
          lead.email,
          lead.status,
          lead.source,
          new Date(lead.createdAt).toISOString(),
        ].join(',')
      ),
    ];

    const csvContent = csvRows.join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=leads.csv');
    res.status(200).send(csvContent);
  } catch (error) {
    next(error);
  }
};