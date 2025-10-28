"use client";

import { useEffect, useRef } from "react";
import { Contact } from "@/types/contact";

interface MapProps {
  contacts: Contact[];
  onMarkerClick: (contact: Contact) => void;
  selectedContact: Contact | null;
}

export default function Map({ contacts, onMarkerClick, selectedContact }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = () => {
      const defaultCenter = { lat: -6.2088, lng: 106.8456 };
      
      googleMapRef.current = new google.maps.Map(mapRef.current!, {
        center: defaultCenter,
        zoom: 12,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      });
    };

    if (typeof google !== "undefined") {
      initMap();
    } else {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (!googleMapRef.current) return;

    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    contacts.forEach((contact) => {
      const marker = new google.maps.Marker({
        position: { lat: contact.latitude, lng: contact.longitude },
        map: googleMapRef.current!,
        title: contact.name,
        animation: google.maps.Animation.DROP,
      });

      marker.addListener("click", () => {
        onMarkerClick(contact);
      });

      markersRef.current.push(marker);
    });

    if (contacts.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      contacts.forEach((contact) => {
        bounds.extend({ lat: contact.latitude, lng: contact.longitude });
      });
      googleMapRef.current.fitBounds(bounds);
    }
  }, [contacts, onMarkerClick]);

  useEffect(() => {
    if (selectedContact && googleMapRef.current) {
      googleMapRef.current.panTo({
        lat: selectedContact.latitude,
        lng: selectedContact.longitude,
      });
      googleMapRef.current.setZoom(15);
    }
  }, [selectedContact]);

  return (
    <div ref={mapRef} className="w-full h-full" />
  );
}
