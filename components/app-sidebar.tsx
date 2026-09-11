import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Cog, Plus, Ticket, User } from "lucide-react";

export function AppSidebar() {
  return (
    <div className="p w-64 bg-[#5C64E1]">
      <div className="px-8 py-6">
        <a href="/painel">
          <span className="text-4xl font-bold flex">
            <p className="text-[#7CDBFD]">IT</p>
            <p className="text-white">-HELP</p>
          </span>
        </a>
        {/* <h1 className="text-2xl font-bold">STOCKLY</h1> */}
      </div>
      <div className="flex flex-col gap-2 p-2">
        <SidebarMenuButton className="pb-3">
          <a href="" className="flex items-center text-xl gap-2">
            <Plus color="white" />
            <p className="text-white">Criar ticket</p>
          </a>
        </SidebarMenuButton>

        <SidebarMenuButton className="pb-3">
          <a href="" className="flex items-center text-[20px] gap-2">
            <Ticket color="white" />
            <p className="text-white">Tickets</p>
          </a>
        </SidebarMenuButton>

        <SidebarMenuButton className="pb-3">
          <a href="" className="flex items-center text-xl gap-2">
            <Cog color="white" />
            <p className="text-white">Configurações</p>
          </a>
        </SidebarMenuButton>

        <SidebarMenuButton className="pb-3">
          <a href="" className="flex items-center text-xl gap-2">
            <User color="white" />
            <p className="text-white">Usuários</p>
          </a>
        </SidebarMenuButton>
      </div>
    </div>
  );
}
