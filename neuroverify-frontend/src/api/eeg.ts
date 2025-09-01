import { dataHttp } from "./http";

export type Session = {
  id: string;
  participantId: string;
  status: "running" | "completed" | "queued";
  startedAt: string;
  endedAt?: string;
};

export const listSessions = async (): Promise<Session[]> => {
  const { data } = await dataHttp.get("/sessions");
  return data;
};

export const startSession = async (payload: { participantId: string; protocolId: string }) => {
  const { data } = await dataHttp.post("/sessions", payload);
  return data as Session;
};

export const getKPIs = async () => {
  const { data } = await dataHttp.get("/analytics/kpis");
  return data as {
    avgAlphaSuppression: number;
    stressIndexDelta: number;
    sessionsToday: number;
  };
};
