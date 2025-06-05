// NodeDialog.jsx
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

export default function NodeDialog({
  open,
  nodeData,
  onClose,
  onSave,
  onDelete,
}) {
  const [label, setLabel] = useState("");
  const [content, setContent] = useState("");
  const [properties, setProperties] = useState("");

  useEffect(() => {
    if (nodeData) {
      setLabel(nodeData.label || "");
      setContent(nodeData.content || "");
      setProperties(JSON.stringify(nodeData.properties || {}, null, 2));
    }
  }, [nodeData]);

  const handleSave = () => {
    let parsedProps = {};
    try {
      parsedProps = JSON.parse(properties);
    } catch (e) {
      alert("Invalid JSON in properties");
      return;
    }
    onSave({ label, content, properties: parsedProps });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Node</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Label"
          margin="normal"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        <TextField
          fullWidth
          label="Content"
          margin="normal"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <TextField
          fullWidth
          label="Properties (JSON)"
          multiline
          rows={4}
          margin="normal"
          value={properties}
          onChange={(e) => setProperties(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onDelete()} color="error">
          Delete
        </Button>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
