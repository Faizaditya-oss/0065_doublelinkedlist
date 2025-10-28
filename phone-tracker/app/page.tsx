"use client";

import { useState, useEffect, useCallback } from "react";
import Map from "@/components/Map";
import ContactList from "@/components/ContactList";
import AddContactForm from "@/components/AddContactForm";
import SearchBar from "@/components/SearchBar";
import { Contact } from "@/types/contact";

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const savedContacts = localStorage.getItem("phoneTrackerContacts");
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("phoneTrackerContacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = useCallback((contactData: Omit<Contact, "id" | "createdAt">) => {
    const newContact: Contact = {
      ...contactData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setContacts((prev) => [...prev, newContact]);
    setSelectedContact(newContact);
  }, []);

  const handleDeleteContact = useCallback((id: string) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
    if (selectedContact?.id === id) {
      setSelectedContact(null);
    }
  }, [selectedContact]);

  const handleContactClick = useCallback((contact: Contact) => {
    setSelectedContact(contact);
  }, []);

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery)
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-96" : "w-0"
        } transition-all duration-300 bg-white shadow-lg overflow-hidden flex flex-col`}
      >
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Phone Tracker
          </h1>
          <p className="text-sm text-gray-600">
            Lacak lokasi kontak tersimpan Anda
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <AddContactForm onAddContact={handleAddContact} />
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          <div className="mb-2 text-sm text-gray-600">
            {filteredContacts.length} kontak
          </div>
          <ContactList
            contacts={filteredContacts}
            onContactClick={handleContactClick}
            onDeleteContact={handleDeleteContact}
            selectedContact={selectedContact}
          />
        </div>
      </div>

      {/* Main Map Area */}
      <div className="flex-1 relative">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-4 left-4 z-10 bg-white p-3 rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
          aria-label="Toggle sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isSidebarOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            )}
          </svg>
        </button>

        {selectedContact && (
          <div className="absolute top-4 right-4 z-10 bg-white p-4 rounded-lg shadow-lg max-w-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-900 text-lg">
                {selectedContact.name}
              </h3>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <p className="text-gray-700 mb-2">📞 {selectedContact.phone}</p>
            {selectedContact.address && (
              <p className="text-sm text-gray-600 mb-2">
                📍 {selectedContact.address}
              </p>
            )}
            <p className="text-xs text-gray-500">
              Lat: {selectedContact.latitude.toFixed(6)}, Lng:{" "}
              {selectedContact.longitude.toFixed(6)}
            </p>
          </div>
        )}

        <Map
          contacts={filteredContacts}
          onMarkerClick={handleContactClick}
          selectedContact={selectedContact}
        />
      </div>
    </div>
  );
}
