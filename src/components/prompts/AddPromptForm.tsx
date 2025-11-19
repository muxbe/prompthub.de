// AddPromptForm Component
// Form for creating new prompts with live preview

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PromptFormPreview } from './PromptFormPreview';

type Platform = {
  id: string;
  name: string;
};

type AddPromptFormProps = {
  platforms: Platform[];
  userId: string;
};

export function AddPromptForm({ platforms, userId }: AddPromptFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    promptText: '',
    category: '',
    customCategory: '',
    platforms: [] as string[],
    visibility: true,
  });

  // Character counters
  const titleCount = formData.title.length;
  const descriptionCount = formData.description.length;
  const promptTextCount = formData.promptText.length;
  const customCategoryCount = formData.customCategory.length;

  // Handle input changes
  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user types
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Handle platform checkbox toggle
  const handlePlatformToggle = (platformId: string) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platformId)
        ? prev.platforms.filter((id) => id !== platformId)
        : [...prev.platforms, platformId],
    }));
  };

  // Client-side validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (formData.title.length < 10) {
      newErrors.title = 'Title must be at least 10 characters';
    } else if (formData.title.length > 200) {
      newErrors.title = 'Title must be 200 characters or less';
    }

    if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    } else if (formData.description.length > 1000) {
      newErrors.description = 'Description must be 1000 characters or less';
    }

    if (formData.promptText.length < 20) {
      newErrors.promptText = 'Prompt text must be at least 20 characters';
    } else if (formData.promptText.length > 5000) {
      newErrors.promptText = 'Prompt text must be 5000 characters or less';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (formData.category === 'Other' && formData.customCategory.length < 3) {
      newErrors.customCategory = 'Custom category must be at least 3 characters';
    } else if (formData.customCategory.length > 50) {
      newErrors.customCategory = 'Custom category must be 50 characters or less';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData for server action
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('prompt_text', formData.promptText);
      formDataToSend.append(
        'category',
        formData.category === 'Other' ? formData.customCategory : formData.category
      );
      formData.platforms.forEach((platformId) => {
        formDataToSend.append('platform_ids', platformId);
      });
      formDataToSend.append('user_id', userId);

      // Import and call server action
      const { createPromptAction } = await import('@/app/(auth)/prompts/new/actions');
      const result = await createPromptAction(formDataToSend);

      if (result.error) {
        setErrors({ submit: result.error });
        setIsSubmitting(false);
      } else {
        // Success - redirect to homepage
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      console.error('Error creating prompt:', error);
      setErrors({ submit: 'Failed to create prompt. Please try again.' });
      setIsSubmitting(false);
    }
  };

  const getCharCountColor = (current: number, max: number) => {
    if (current > max) return 'text-red-500';
    if (current > max * 0.9) return 'text-yellow-600';
    return 'text-gray-500';
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Form Section (Left - 60%) */}
      <div className="lg:col-span-3">
        <div className="border border-gray-200 rounded-lg p-8 bg-white">
          <h2 className="text-2xl font-bold mb-6">Create New Prompt</h2>

          {/* Title Field */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title*
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Example title..."
              maxLength={200}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
              <p className={`text-xs ml-auto ${getCharCountColor(titleCount, 200)}`}>
                {titleCount}/200
              </p>
            </div>
          </div>

          {/* Description Field */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description*
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="What does it do? When would you use it?"
              maxLength={1000}
              rows={4}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
              <p className={`text-xs ml-auto ${getCharCountColor(descriptionCount, 1000)}`}>
                {descriptionCount}/1000
              </p>
            </div>
          </div>

          {/* Prompt Text Field */}
          <div className="mb-6">
            <label htmlFor="promptText" className="block text-sm font-medium text-gray-700 mb-2">
              Text of prompt*
            </label>
            <textarea
              id="promptText"
              value={formData.promptText}
              onChange={(e) => handleInputChange('promptText', e.target.value)}
              placeholder="Paste prompt here"
              maxLength={5000}
              rows={6}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono text-sm ${
                errors.promptText ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.promptText && <p className="text-sm text-red-500">{errors.promptText}</p>}
              <p className={`text-xs ml-auto ${getCharCountColor(promptTextCount, 5000)}`}>
                {promptTextCount}/5000
              </p>
            </div>
          </div>

          {/* Category Field */}
          <div className="mb-6">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Choose category*
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.category ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="" disabled>
                Select category...
              </option>
              <option value="Copywriting">Copywriting</option>
              <option value="Development">Development</option>
              <option value="Marketing">Marketing</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>
            {errors.category && <p className="text-sm text-red-500 mt-1">{errors.category}</p>}

            {/* Custom Category Input (shows when "Other" selected) */}
            {formData.category === 'Other' && (
              <div className="mt-3">
                <input
                  type="text"
                  value={formData.customCategory}
                  onChange={(e) => handleInputChange('customCategory', e.target.value)}
                  placeholder="Enter custom category..."
                  maxLength={50}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                    errors.customCategory ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.customCategory && (
                    <p className="text-sm text-red-500">{errors.customCategory}</p>
                  )}
                  <p className={`text-xs ml-auto ${getCharCountColor(customCategoryCount, 50)}`}>
                    {customCategoryCount}/50
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* AI Platforms Field */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              AI Platforms
              <span className="text-gray-500 font-normal ml-2">(Optional)</span>
            </label>
            <div className="space-y-2">
              {platforms.map((platform) => (
                <label key={platform.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.platforms.includes(platform.id)}
                    onChange={() => handlePlatformToggle(platform.id)}
                    className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{platform.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Visibility Checkbox (cosmetic only in v1) */}
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.visibility}
                onChange={(e) => handleInputChange('visibility', e.target.checked)}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">Will be visible for all</span>
            </label>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{errors.submit}</p>
            </div>
          )}

          {/* Form Buttons */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => router.back()}
              disabled={isSubmitting}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating...' : 'Create Prompt'}
            </button>
          </div>
        </div>
      </div>

      {/* Preview Section (Right - 40%) */}
      <div className="lg:col-span-2">
        <div className="sticky top-6">
          <PromptFormPreview
            title={formData.title}
            description={formData.description}
            promptText={formData.promptText}
            category={formData.category}
            customCategory={formData.customCategory}
          />
        </div>
      </div>
    </form>
  );
}
