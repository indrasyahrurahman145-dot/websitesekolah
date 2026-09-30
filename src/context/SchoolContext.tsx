import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SchoolProfile,
  NewsItem,
  PPDBApplicant,
  Teacher,
  AcademicEvent,
  GalleryItem,
  SchoolFacility,
  ContactMessage,
  DownloadItem,
  PPDBStatus
} from '../types';
import {
  initialSchoolProfile,
  initialNews,
  initialPPDBApplicants,
  initialTeachers,
  initialAcademicEvents,
  initialFacilities,
  initialGallery,
  initialContactMessages,
  initialDownloads
} from '../data/initialData';

interface SchoolContextType {
  // Data states
  profile: SchoolProfile;
  news: NewsItem[];
  applicants: PPDBApplicant[];
  teachers: Teacher[];
  events: AcademicEvent[];
  facilities: SchoolFacility[];
  gallery: GalleryItem[];
  messages: ContactMessage[];
  downloads: DownloadItem[];
  
  // Auth state
  isAdminLoggedIn: boolean;
  adminUser: { name: string; email: string; role: string } | null;
  loginAdmin: (email: string, pass: string) => boolean;
  logoutAdmin: () => void;

  // View state: 'public' | 'admin'
  currentView: 'public' | 'admin';
  setCurrentView: (view: 'public' | 'admin') => void;

  // Admin Actions
  updateProfile: (updated: SchoolProfile) => void;
  addNews: (item: Omit<NewsItem, 'id' | 'reads'>) => void;
  updateNews: (id: string, item: Partial<NewsItem>) => void;
  deleteNews: (id: string) => void;
  
  // PPDB Actions
  submitApplicant: (applicantData: Omit<PPDBApplicant, 'id' | 'registrationNo' | 'status' | 'submittedAt'>) => PPDBApplicant;
  updateApplicantStatus: (id: string, status: PPDBStatus, adminNotes?: string) => void;
  deleteApplicant: (id: string) => void;

  // Teacher Actions
  addTeacher: (teacher: Omit<Teacher, 'id'>) => void;
  updateTeacher: (id: string, teacher: Partial<Teacher>) => void;
  deleteTeacher: (id: string) => void;

  // Event Actions
  addEvent: (ev: Omit<AcademicEvent, 'id'>) => void;
  updateEvent: (id: string, ev: Partial<AcademicEvent>) => void;
  deleteEvent: (id: string) => void;

  // Gallery Actions
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;

  // Contact Actions
  sendMessage: (msg: Omit<ContactMessage, 'id' | 'date' | 'status'>) => void;
  replyMessage: (id: string, replyText: string) => void;
  markMessageRead: (id: string) => void;
  deleteMessage: (id: string) => void;

  // Reset
  resetToDefaults: () => void;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PROFILE: 'sman1_profile_v1',
  NEWS: 'sman1_news_v1',
  APPLICANTS: 'sman1_applicants_v1',
  TEACHERS: 'sman1_teachers_v1',
  EVENTS: 'sman1_events_v1',
  FACILITIES: 'sman1_facilities_v1',
  GALLERY: 'sman1_gallery_v1',
  MESSAGES: 'sman1_messages_v1',
  DOWNLOADS: 'sman1_downloads_v1',
  ADMIN_SESSION: 'sman1_admin_session_v1'
};

export const SchoolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<SchoolProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return saved ? JSON.parse(saved) : initialSchoolProfile;
    } catch {
      return initialSchoolProfile;
    }
  });

  const [news, setNews] = useState<NewsItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NEWS);
      return saved ? JSON.parse(saved) : initialNews;
    } catch {
      return initialNews;
    }
  });

  const [applicants, setApplicants] = useState<PPDBApplicant[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.APPLICANTS);
      return saved ? JSON.parse(saved) : initialPPDBApplicants;
    } catch {
      return initialPPDBApplicants;
    }
  });

  const [teachers, setTeachers] = useState<Teacher[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TEACHERS);
      return saved ? JSON.parse(saved) : initialTeachers;
    } catch {
      return initialTeachers;
    }
  });

  const [events, setEvents] = useState<AcademicEvent[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EVENTS);
      return saved ? JSON.parse(saved) : initialAcademicEvents;
    } catch {
      return initialAcademicEvents;
    }
  });

  const [facilities] = useState<SchoolFacility[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FACILITIES);
      return saved ? JSON.parse(saved) : initialFacilities;
    } catch {
      return initialFacilities;
    }
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GALLERY);
      return saved ? JSON.parse(saved) : initialGallery;
    } catch {
      return initialGallery;
    }
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      return saved ? JSON.parse(saved) : initialContactMessages;
    } catch {
      return initialContactMessages;
    }
  });

  const [downloads] = useState<DownloadItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DOWNLOADS);
      return saved ? JSON.parse(saved) : initialDownloads;
    } catch {
      return initialDownloads;
    }
  });

  // Admin session state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION) === 'true';
    } catch {
      return false;
    }
  });

  const [adminUser, setAdminUser] = useState<{ name: string; email: string; role: string } | null>(() => {
    return isAdminLoggedIn
      ? { name: 'Administrator SIMS', email: 'admin@sman1nusantara.sch.id', role: 'Super Admin Sistem' }
      : null;
  });

  const [currentView, setCurrentView] = useState<'public' | 'admin'>('public');

  // Persistence side-effects
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error(e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(news));
    } catch (e) {
      console.error(e);
    }
  }, [news]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.APPLICANTS, JSON.stringify(applicants));
    } catch (e) {
      console.error(e);
    }
  }, [applicants]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TEACHERS, JSON.stringify(teachers));
    } catch (e) {
      console.error(e);
    }
  }, [teachers]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    } catch (e) {
      console.error(e);
    }
  }, [events]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
    } catch (e) {
      console.error(e);
    }
  }, [gallery]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    } catch (e) {
      console.error(e);
    }
  }, [messages]);

  // Auth methods
  const loginAdmin = (email: string, _pass: string) => {
    // Demo login accepts any password if email matches or standard demo
    setIsAdminLoggedIn(true);
    const user = {
      name: 'Drs. H. Bambang Suryono / Tim SIMS',
      email: email || 'admin@sman1nusantara.sch.id',
      role: 'Super Administrator'
    };
    setAdminUser(user);
    try {
      localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, 'true');
    } catch (e) {
      console.error(e);
    }
    return true;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setAdminUser(null);
    setCurrentView('public');
    try {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
    } catch (e) {
      console.error(e);
    }
  };

  // Profile actions
  const updateProfile = (updated: SchoolProfile) => {
    setProfile(updated);
  };

  // News actions
  const addNews = (item: Omit<NewsItem, 'id' | 'reads'>) => {
    const newItem: NewsItem = {
      ...item,
      id: `news-${Date.now()}`,
      reads: 1
    };
    setNews((prev) => [newItem, ...prev]);
  };

  const updateNews = (id: string, updated: Partial<NewsItem>) => {
    setNews((prev) => prev.map((n) => (n.id === id ? { ...n, ...updated } : n)));
  };

  const deleteNews = (id: string) => {
    setNews((prev) => prev.filter((n) => n.id !== id));
  };

  // PPDB actions
  const submitApplicant = (applicantData: Omit<PPDBApplicant, 'id' | 'registrationNo' | 'status' | 'submittedAt'>): PPDBApplicant => {
    const randomNum = Math.floor(100 + Math.random() * 900);
    const regNo = `PPDB-2026-${String(applicants.length + 1).padStart(3, '0')}${randomNum.toString().slice(0, 1)}`;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newApplicant: PPDBApplicant = {
      ...applicantData,
      id: `ppdb-${Date.now()}`,
      registrationNo: regNo,
      status: 'menunggu',
      submittedAt: formattedDate
    };

    setApplicants((prev) => [newApplicant, ...prev]);
    return newApplicant;
  };

  const updateApplicantStatus = (id: string, status: PPDBStatus, adminNotes?: string) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    setApplicants((prev) =>
      prev.map((app) =>
        app.id === id
          ? {
              ...app,
              status,
              adminNotes: adminNotes !== undefined ? adminNotes : app.adminNotes,
              verifiedAt: formattedDate
            }
          : app
      )
    );
  };

  const deleteApplicant = (id: string) => {
    setApplicants((prev) => prev.filter((a) => a.id !== id));
  };

  // Teacher actions
  const addTeacher = (teacher: Omit<Teacher, 'id'>) => {
    const newT: Teacher = {
      ...teacher,
      id: `t-${Date.now()}`
    };
    setTeachers((prev) => [...prev, newT]);
  };

  const updateTeacher = (id: string, updated: Partial<Teacher>) => {
    setTeachers((prev) => prev.map((t) => (t.id === id ? { ...t, ...updated } : t)));
  };

  const deleteTeacher = (id: string) => {
    setTeachers((prev) => prev.filter((t) => t.id !== id));
  };

  // Event actions
  const addEvent = (ev: Omit<AcademicEvent, 'id'>) => {
    const newEv: AcademicEvent = {
      ...ev,
      id: `ev-${Date.now()}`
    };
    setEvents((prev) => [...prev, newEv]);
  };

  const updateEvent = (id: string, updated: Partial<AcademicEvent>) => {
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, ...updated } : e)));
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  // Gallery actions
  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newG: GalleryItem = {
      ...item,
      id: `gal-${Date.now()}`
    };
    setGallery((prev) => [newG, ...prev]);
  };

  const deleteGalleryItem = (id: string) => {
    setGallery((prev) => prev.filter((g) => g.id !== id));
  };

  // Message actions
  const sendMessage = (msg: Omit<ContactMessage, 'id' | 'date' | 'status'>) => {
    const now = new Date();
    const formatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newM: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      date: formatted,
      status: 'belum_dibaca'
    };
    setMessages((prev) => [newM, ...prev]);
  };

  const replyMessage = (id: string, replyText: string) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              status: 'dibalas',
              adminReply: replyText
            }
          : m
      )
    );
  };

  const markMessageRead = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id && m.status === 'belum_dibaca' ? { ...m, status: 'sudah_dibaca' } : m))
    );
  };

  const deleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const resetToDefaults = () => {
    setProfile(initialSchoolProfile);
    setNews(initialNews);
    setApplicants(initialPPDBApplicants);
    setTeachers(initialTeachers);
    setEvents(initialAcademicEvents);
    setGallery(initialGallery);
    setMessages(initialContactMessages);
  };

  return (
    <SchoolContext.Provider
      value={{
        profile,
        news,
        applicants,
        teachers,
        events,
        facilities,
        gallery,
        messages,
        downloads,
        isAdminLoggedIn,
        adminUser,
        loginAdmin,
        logoutAdmin,
        currentView,
        setCurrentView,
        updateProfile,
        addNews,
        updateNews,
        deleteNews,
        submitApplicant,
        updateApplicantStatus,
        deleteApplicant,
        addTeacher,
        updateTeacher,
        deleteTeacher,
        addEvent,
        updateEvent,
        deleteEvent,
        addGalleryItem,
        deleteGalleryItem,
        sendMessage,
        replyMessage,
        markMessageRead,
        deleteMessage,
        resetToDefaults
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchool = () => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchool must be used within a SchoolProvider');
  }
  return context;
};
