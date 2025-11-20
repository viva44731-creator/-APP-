
import { Camera, CameraStatus, EventType, SecurityEvent, FamilyMember, AlertRule, PrivacyLog, IoTDevice } from '../types';

export const MOCK_CAMERAS: Camera[] = [
  {
    id: 'cam1',
    name: 'Living Room Main',
    location: 'Living Room',
    status: CameraStatus.ONLINE,
    thumbnailUrl: 'https://picsum.photos/id/1074/800/450',
    isRecording: true,
    lastEventTime: '2 mins ago',
    model: 'HC-2000',
    signalStrength: 'STRONG',
    storageUsed: '45GB',
    storageTotal: '64GB'
  },
  {
    id: 'cam2',
    name: 'Baby Nursery',
    location: 'Bedroom 2',
    status: CameraStatus.ONLINE,
    thumbnailUrl: 'https://picsum.photos/id/1004/800/450',
    isRecording: true,
    lastEventTime: '10:42 AM',
    model: 'HC-2000',
    signalStrength: 'MEDIUM',
    storageUsed: '32GB',
    storageTotal: '64GB'
  },
  {
    id: 'cam3',
    name: 'Front Door',
    location: 'Entrance',
    status: CameraStatus.ONLINE,
    thumbnailUrl: 'https://picsum.photos/id/204/800/450',
    isRecording: true,
    batteryLevel: 85,
    lastEventTime: 'Yesterday',
    model: 'HC-3000',
    signalStrength: 'STRONG',
    storageUsed: '12GB',
    storageTotal: '32GB'
  },
  {
    id: 'cam4',
    name: 'Backyard',
    location: 'Garden',
    status: CameraStatus.OFFLINE,
    thumbnailUrl: 'https://picsum.photos/id/129/800/450',
    isRecording: false,
    batteryLevel: 12,
    lastEventTime: '30 mins ago',
    model: 'HC-3000',
    signalStrength: 'NONE',
    storageUsed: '28GB',
    storageTotal: '32GB'
  }
];

export const MOCK_IOT_DEVICES: IoTDevice[] = [
  {
    id: 'iot1',
    name: 'Front Door Lock',
    type: 'LOCK',
    status: 'ONLINE',
    batteryLevel: 85,
  },
  {
    id: 'iot2',
    name: 'Living Room Light',
    type: 'LIGHT',
    status: 'ONLINE',
    powerStatus: 'NORMAL'
  }
];

export const generateMockEvents = (): SecurityEvent[] => {
  const now = new Date();
  return [
    {
      id: 'evt1',
      cameraId: 'cam2',
      cameraName: 'Baby Nursery',
      type: EventType.BABY_CRYING,
      timestamp: new Date(now.getTime() - 1000 * 60 * 5), // 5 mins ago
      thumbnailUrl: 'https://picsum.photos/id/998/300/200',
      confidence: 0.98,
      description: 'Loud crying detected. Baby movement detected.',
      isReviewed: false
    },
    {
      id: 'evt2',
      cameraId: 'cam3',
      cameraName: 'Front Door',
      type: EventType.STRANGER_DETECTED,
      timestamp: new Date(now.getTime() - 1000 * 60 * 45), // 45 mins ago
      thumbnailUrl: 'https://picsum.photos/id/338/300/200',
      confidence: 0.92,
      description: 'Unrecognized face detected at entrance.',
      isReviewed: false
    },
    {
      id: 'evt3',
      cameraId: 'cam1',
      cameraName: 'Living Room Main',
      type: EventType.ELDERLY_FALL,
      timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 2), // 2 hours ago
      thumbnailUrl: 'https://picsum.photos/id/1025/300/200',
      confidence: 0.89,
      description: 'Rapid vertical descent detected near sofa.',
      isReviewed: true
    },
    {
      id: 'evt4',
      cameraId: 'cam1',
      cameraName: 'Living Room Main',
      type: EventType.PET_ACTIVITY,
      timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 5), 
      thumbnailUrl: 'https://picsum.photos/id/237/300/200',
      confidence: 0.75,
      description: 'Dog detected on restricted furniture.',
      isReviewed: true
    }
  ];
};

export const MOCK_FAMILY: FamilyMember[] = [
  {
    id: 'u1',
    name: 'Zhang San',
    relation: 'Me',
    role: 'ADMIN',
    avatarUrl: 'https://ui-avatars.com/api/?name=Zhang+San&background=3b82f6&color=fff',
    isOnline: true,
    permissions: ['ALL']
  },
  {
    id: 'u2',
    name: 'Li Si',
    relation: 'Wife',
    role: 'MEMBER',
    avatarUrl: 'https://ui-avatars.com/api/?name=Li+Si&background=ec4899&color=fff',
    isOnline: true,
    permissions: ['VIEW', 'CONTROL']
  },
  {
    id: 'u3',
    name: 'Wang Wu',
    relation: 'Father',
    role: 'MEMBER',
    avatarUrl: 'https://ui-avatars.com/api/?name=Wang+Wu&background=8b5cf6&color=fff',
    isOnline: false,
    lastActive: '1 hour ago',
    permissions: ['VIEW_LIVING_ROOM']
  },
  {
    id: 'u4',
    name: 'Xiao Ming',
    relation: 'Son',
    role: 'VISITOR',
    avatarUrl: 'https://ui-avatars.com/api/?name=Xiao+Ming&background=f59e0b&color=fff',
    isOnline: true,
    permissions: ['VIEW']
  }
];

export const MOCK_RULES: AlertRule[] = [
  {
    id: 'r1',
    name: 'Stranger Detection',
    trigger: 'Face Unrecognized',
    sensitivity: 'HIGH',
    timeRange: '24/7',
    notification: ['APP', 'SMS'],
    action: 'Turn on lights',
    isEnabled: true
  },
  {
    id: 'r2',
    name: 'Elderly Fall',
    trigger: 'Fall Detected',
    sensitivity: 'MEDIUM',
    timeRange: '24/7',
    notification: ['APP', 'CALL'],
    action: 'Emergency Call',
    isEnabled: true
  },
  {
    id: 'r3',
    name: 'Glass Break',
    trigger: 'Sound Anomaly',
    sensitivity: 'HIGH',
    timeRange: '22:00-08:00',
    notification: ['APP'],
    action: 'None',
    isEnabled: false
  }
];

export const MOCK_PRIVACY_LOGS: PrivacyLog[] = [
  { id: 'l1', action: 'View Live', user: 'Li Si', timestamp: '2 mins ago', detail: 'Living Room Cam' },
  { id: 'l2', action: 'Download', user: 'Zhang San', timestamp: '1 hour ago', detail: 'Clip 20251119_01' },
  { id: 'l3', action: 'Setting Change', user: 'Zhang San', timestamp: 'Yesterday', detail: 'Added User' },
];
