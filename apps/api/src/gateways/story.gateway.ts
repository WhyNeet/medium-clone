import { WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway({ path: "/story" })
export class StoryGateway {}
