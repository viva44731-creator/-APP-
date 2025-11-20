
export enum EventType {
  PERSON_DETECTED = 'PERSON_DETECTED',
  BABY_CRYING = 'BABY_CRYING',
  ELDERLY_FALL = 'ELDERLY_FALL',
  PET_ACTIVITY = 'PET_ACTIVITY',
  STRANGER_DETECTED = 'STRANGER_DETECTED',
  MOTION = 'MOTION',
  SOUND = 'SOUND'
}

export enum CameraStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  PRIVACY_MODE = 'PRIVACY_MODE'
}

export interface Camera {
  id: string;
  name: string;
  location: string;
  status: CameraStatus;
  thumbnailUrl: string;
  isRecording: boolean;
  batteryLevel?: number; // For wireless cams
  lastEventTime?: string;
  // Hardware specs
  model?: string;
  signalStrength?: 'STRONG' | 'MEDIUM' | 'WEAK' | 'NONE';
  storageUsed?: string;
  storageTotal?: string;
}

export interface IoTDevice {
  id: string;
  name: string;
  type: 'LOCK' | 'LIGHT' | 'SENSOR';
  status: 'ONLINE' | 'OFFLINE';
  batteryLevel?: number;
  powerStatus?: 'NORMAL' | 'LOW' | 'CHARGING';
}

export interface SecurityEvent {
  id: string;
  cameraId: string;
  cameraName: string;
  type: EventType;
  timestamp: Date;
  thumbnailUrl: string;
  videoUrl?: string;
  confidence: number;
  description: string;
  isReviewed: boolean;
}

export interface AIAnalysisResult {
  summary: string;
  threatLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  recommendations: string[];
}

export type FamilyRole = 'ADMIN' | 'MEMBER' | 'VISITOR';

export interface FamilyMember {
  id: string;
  name: string;
  relation: string; // e.g., Wife, Father
  role: FamilyRole;
  avatarUrl: string;
  isOnline: boolean;
  lastActive?: string;
  permissions: string[];
}

export interface AlertRule {
  id: string;
  name: string;
  trigger: string;
  sensitivity: 'LOW' | 'MEDIUM' | 'HIGH';
  timeRange: string;
  notification: string[];
  action: string;
  isEnabled: boolean;
}

export interface PrivacyLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  detail: string;
}
