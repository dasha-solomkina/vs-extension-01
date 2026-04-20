import * as vscode from 'vscode';
import { pickQuote, formatQuote } from './quotes';
import { msUntilNineAM, todayISO } from './scheduler';

const KEY_LAST_SHOWN = 'anti-motivator.lastShownDate';
const KEY_SEEN       = 'anti-motivator.seenQuoteIndices';

let timer: ReturnType<typeof setTimeout> | undefined;

export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.commands.registerCommand('anti-motivator.showQuote', () => showQuotePopup(context))
  );
  scheduleOrShow(context);
}

export function deactivate(): void {
  if (timer !== undefined) clearTimeout(timer);
}

function scheduleOrShow(context: vscode.ExtensionContext): void {
  const lastShown = context.globalState.get<string>(KEY_LAST_SHOWN);
  if (lastShown === todayISO()) {
    // Already shown today — wait until tomorrow's 9am
    timer = setTimeout(() => showQuotePopup(context), msUntilNineAM());
    return;
  }
  // Not shown today — schedule for next 9am (could be 0ms if exactly 9am now)
  timer = setTimeout(() => showQuotePopup(context), msUntilNineAM());
}

async function showQuotePopup(context: vscode.ExtensionContext): Promise<void> {
  const today = todayISO();
  const lastShown = context.globalState.get<string>(KEY_LAST_SHOWN);
  // Reset seen list at day boundary
  let seen: number[] = lastShown === today
    ? (context.globalState.get<number[]>(KEY_SEEN) ?? [])
    : [];

  while (true) {
    const { quote, newSeenIndices } = pickQuote(seen);
    seen = newSeenIndices;
    await context.globalState.update(KEY_SEEN, seen);

    const selection = await vscode.window.showInformationMessage(
      formatQuote(quote),
      'New Quote',
      'Dismiss'
    );

    if (selection === 'New Quote') continue;

    // Dismissed (button or X) — mark today as done, schedule tomorrow
    await context.globalState.update(KEY_LAST_SHOWN, today);
    timer = setTimeout(() => showQuotePopup(context), msUntilNineAM());
    break;
  }
}
