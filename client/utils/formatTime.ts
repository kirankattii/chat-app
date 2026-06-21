export function formatTime(isbString?: string | null): string {
  if (!isbString) return ""
  const date = new Date(isbString);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
   const diffDays = Math.floor(diffHours / 86400000);


   if(diffMins<1) return "Just Now"
   if(diffHours<1) return `${diffMins}m ago`
   if(diffDays<1){
    return date.toLocaleTimeString([],{hour:"numeric",minute:"2-digit",hour12:true})
   }
   if(diffDays ===1) return "Yesterday"
   if(diffDays< 7){
    return date.toLocaleDateString([],{
       weekday:"short",
    })
   }
    return date.toLocaleDateString([],{month:"short",day:"numeric"})
}