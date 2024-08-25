"use client";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import axios from "axios";

function SwitchButton() {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchIsAcceptingMessages = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/check-accepting-message");
      
      setChecked(response.data.isAcceptingMessages);
    } catch (error) {
      console.error("Error fetching status:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = async (value: boolean) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `/api/toggle-accepting-mesage?toggle=${value}`
      );
      setChecked(value);
    } catch (error) {
      console.error("Error toggling status:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIsAcceptingMessages();
  }, []);

  return (
    <div className="flex items-center space-x-2 px-3">
      <Switch
        id="accepting-message"
        checked={checked}
        onCheckedChange={handleChange}
        disabled={loading}
      />
      {loading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <Label htmlFor="accepting-message">Accepting Messages</Label>
      )}   
    </div>
  );
}

export default SwitchButton;
