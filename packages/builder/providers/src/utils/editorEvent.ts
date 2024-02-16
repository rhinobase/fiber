export enum EditorEvent {
  ALL = "all",
  BLOCK_ID_GENERATION = "block_id_generation",
  // Canvas
  CANVAS_SELECTION = "canvas_selection",
  CANVAS_ADDITION = "canvas_addition",
  CANVAS_DELETION = "canvas_deletion",
  CANVAS_RESET = "canvas_reset",
  // Blocks
  BLOCK_ADDITION = "block_addition",
  BLOCK_UPDATION = "block_updation",
  BLOCK_ID_UPDATION = "block_id_updation",
  BLOCK_DELETION = "block_deletion",
  BLOCK_REPOSITION = "block_reposition",
  BLOCK_SELECTION = "block_selection",
  BLOCK_DUPLICATION = "block_duplication",
  // Layout
  LAYOUT_UPDATE = "layout_update",
  // Env
  ENV_CHANGE = "env_change",
  // Tab
  ACTIVE_TAB = "active_tab",
  ADD_TAB = "add_tab",
}
