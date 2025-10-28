"use client";

import { Contact } from "@/types/contact";

interface ContactListProps {
  contacts: Contact[];
  onContactClick: (contact: Contact) => void;
  onDeleteContact: (id: string) => void;
  selectedContact: Contact | null;
}

export default function ContactList({
  contacts,
  onContactClick,
  onDeleteContact,
  selectedContact,
}: ContactListProps) {
  return (
    <div className="space-y-2">
      {contacts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>Belum ada kontak tersimpan</p>
          <p className="text-sm mt-2">Tambahkan kontak pertama Anda</p>
        </div>
      ) : (
        contacts.map((contact) => (
          <div
            key={contact.id}
            className={`p-4 rounded-lg border transition-all cursor-pointer hover:shadow-md ${
              selectedContact?.id === contact.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-white hover:border-blue-300"
            }`}
            onClick={() => onContactClick(contact)}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{contact.phone}</p>
                {contact.address && (
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                    {contact.address}
                  </p>
                )}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteContact(contact.id);
                }}
                className="ml-2 text-red-500 hover:text-red-700 transition-colors"
                aria-label="Hapus kontak"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
