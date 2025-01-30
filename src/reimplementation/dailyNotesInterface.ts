import type { Moment } from "moment";
import { App, normalizePath, Notice, TFile, TFolder, Vault } from "obsidian";
import { DailyNotesFolderMissingError, getDailyNoteSettings, getDateFromFile, getDateUID, getTemplateInfo } from "obsidian-daily-notes-interface";

// Credit: @liamcain/obsidian-daily-notes-interface/src/vault.ts

/**
 * This function mimics the behavior of the daily-notes plugin
 * so it will replace {{date}}, {{title}}, and {{time}} with the
 * formatted timestamp.
 *
 * Note: it has an added bonus that it's not 'today' specific.
 */
export async function createDailyNote(date: Moment): Promise<TFile> {
    const app = window.app as App;
    const { vault } = app;
    const moment = window.moment;
  
    const { template, format, folder } = getDailyNoteSettings();
  
    const [templateContents, IFoldInfo] = await getTemplateInfo(template);
    const filename = date.format(format);
    const normalizedPath = await getNotePath(folder, filename);
  
    try {
      const createdFile = await vault.create(
        normalizedPath,
        templateContents
          .replace(/{{\s*date\s*}}/gi, filename)
          .replace(/{{\s*time\s*}}/gi, moment().format("HH:mm"))
          .replace(/{{\s*title\s*}}/gi, filename)
          .replace(
            /{{\s*(date|time)\s*(([+-]\d+)([yqmwdhs]))?\s*(:.+?)?}}/gi,
            (_, _timeOrDate, calc, timeDelta, unit, momentFormat) => {
              const now = moment();
              const currentDate = date.clone().set({
                hour: now.get("hour"),
                minute: now.get("minute"),
                second: now.get("second"),
              });
              if (calc) {
                currentDate.add(parseInt(timeDelta, 10), unit);
              }
  
              if (momentFormat) {
                return currentDate.format(momentFormat.substring(1).trim());
              }
              return currentDate.format(format);
            }
          )
          .replace(
            /{{\s*yesterday\s*}}/gi,
            date.clone().subtract(1, "day").format(format)
          )
          .replace(
            /{{\s*tomorrow\s*}}/gi,
            date.clone().add(1, "d").format(format)
          )
      );
  
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (app as any).foldManager.save(createdFile, IFoldInfo);
  
      return createdFile;
    } catch (err) {
      console.error(`Failed to create file: '${normalizedPath}'`, err);
      new Notice("Unable to create new file.");
    }
  }
  
export function getDailyNote(
date: Moment,
dailyNotes: Record<string, TFile>
): TFile {
return dailyNotes[getDateUID(date, "day")] ?? null;
}
  
  export function getAllDailyNotes(): Record<string, TFile> {
    /**
     * Find all daily notes in the daily note folder
     */
    const { vault } = window.app;
    const { folder } = getDailyNoteSettings();
  
    const dailyNotesFolder = vault.getAbstractFileByPath(
      normalizePath(folder)
    ) as TFolder;
  
    if (!dailyNotesFolder) {
      throw new DailyNotesFolderMissingError("Failed to find daily notes folder");
    }
  
    const dailyNotes: Record<string, TFile> = {};
    Vault.recurseChildren(dailyNotesFolder, (note) => {
      if (note instanceof TFile) {
        const date = getDateFromFile(note, "day");
        if (date) {
          const dateString = getDateUID(date, "day");
          dailyNotes[dateString] = note;
        }
      }
    });
  
    return dailyNotes;
  }

// Credit: @liamcain/obsidian-daily-notes-interface/src/vault.ts

// Credit: @creationix/path.js
export function join(...partSegments: string[]): string {
    // Split the inputs into a list of path commands.
    let parts = [];
    for (let i = 0, l = partSegments.length; i < l; i++) {
      parts = parts.concat(partSegments[i].split("/"));
    }
    // Interpret the path commands to get the new resolved path.
    const newParts = [];
    for (let i = 0, l = parts.length; i < l; i++) {
      const part = parts[i];
      // Remove leading and trailing slashes
      // Also remove "." segments
      if (!part || part === ".") continue;
      // Push new path segments.
      else newParts.push(part);
    }
    // Preserve the initial slash if there was one.
    if (parts[0] === "") newParts.unshift("");
    // Turn back into a single string path.
    return newParts.join("/");
  }


  async function ensureFolderExists(path: string): Promise<void> {
    const dirs = path.replace(/\\/g, "/").split("/");
    dirs.pop(); // remove basename
  
    if (dirs.length) {
      const dir = join(...dirs);
      if (!window.app.vault.getAbstractFileByPath(dir)) {
        await window.app.vault.createFolder(dir);
      }
    }
  }

  async function getNotePath(
    directory: string,
    filename: string
  ): Promise<string> {
    if (!filename.endsWith(".md")) {
      filename += ".md";
    }
    const path = normalizePath(join(directory, filename));
  
    await ensureFolderExists(path);
  
    return path;
  }