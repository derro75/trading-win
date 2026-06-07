"use client";

import { useEffect, useCallback, useRef, useState } from 'react';

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastJsonMessage, setLastJsonMessage] = useState<any>(null);
  const socketRef = useRef<WebSocket | null>(null);

  const connect = useCallback(() => {
    if (socketRef.current?.readyState === WebSocket.OPEN) return;

    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001';
    socketRef.current = new WebSocket(wsUrl);

    socketRef.current.onopen = () => {
      setIsConnected(true);
      console.log('WS: Connected to Market Feed');
    };

    socketRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setLastJsonMessage(data);
      } catch (e) {
        console.error('WS: Message Error', e);
      }
    };

    socketRef.current.onclose = () => {
      setIsConnected(false);
      console.log('WS: Disconnected. Retrying...');
      setTimeout(connect, 5000); // Reconnect logic
    };
  }, []);

  useEffect(() => {
    connect();
    return () => {
      socketRef.current?.close();
    };
  }, [connect]);

  const sendJsonMessage = useCallback((message: any) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    }
  }, []);

  return { isConnected, lastJsonMessage, sendJsonMessage };
};
