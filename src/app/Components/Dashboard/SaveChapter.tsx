type SaveChapterProps = {
  onSave: () => void;
  isSaving: boolean;
  saveStatus: 'idle' | 'success' | 'error';
  editorContent: object | null;
  chapterName: string;
};

const SaveChapter = ({ onSave, isSaving, saveStatus, editorContent, chapterName }: SaveChapterProps) => {
  // Check if editor has actual text content
  const hasEditorContent = (() => {
    if (!editorContent) return false;

    // Convert to string and check if it contains actual content beyond empty structure
    const contentStr = JSON.stringify(editorContent);

    // TipTap empty editor typically has structure like {"type":"doc","content":[{"type":"paragraph"}]}
    // This creates a false positive, so even if theres no actual text, editorContent is considered truthy
    // We need to check if there's actual text in the content
    const hasText = contentStr.includes('"text"');

    return hasText;
  })();

  const hasContent = hasEditorContent && chapterName.trim();
  const isDisabled = isSaving || !hasContent;

  return (
    <div className='fixed bottom-0 right-0 left-0 bg-white border-t border-gray-200 shadow-lg p-4'>
      <div className='max-w-6xl mx-auto flex justify-end'>
        <button
          onClick={onSave}
          disabled={isDisabled}
          className={`
              px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200
              ${
                isDisabled
                  ? 'bg-gray-400 cursor-not-allowed'
                  : saveStatus === 'success'
                  ? 'bg-green-500 hover:bg-green-600'
                  : saveStatus === 'error'
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-blue-500 hover:bg-blue-600 transform hover:-translate-y-0.5'
              }
              ${saveStatus === 'success' || saveStatus === 'error' ? 'shadow-lg' : 'shadow-md'}
            `}
        >
          {isSaving ? (
            <div className='flex items-center gap-2'>
              <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
              Saving...
            </div>
          ) : saveStatus === 'success' ? (
            <div className='flex items-center gap-2'>
              <span>✓</span>
              Saved!
            </div>
          ) : saveStatus === 'error' ? (
            <div className='flex items-center gap-2'>
              <span>✗</span>
              Save Failed
            </div>
          ) : (
            'Save Chapter'
          )}
        </button>
      </div>
    </div>
  );
};

export default SaveChapter;
